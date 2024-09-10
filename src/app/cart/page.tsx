"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { states } from "@/helpers/states"
import { useRouter } from "next/navigation"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { LinearBlur } from "progressive-blur"

interface GroceryItem {
  id: number
  name: string
  price: number
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Cart() {
  const router = useRouter()
  const [items, setItems] = useState<GroceryItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<'back' | 'clear'>('back')
  const [originalItems, setOriginalItems] = useState<GroceryItem[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  const itemNameInputRef = useRef<HTMLInputElement>(null)
  const itemPriceInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")
    const storedItems = localStorage.getItem("groceryItems")
    if (storedCurrency && storedState) {
      setSelectedCountry(storedCurrency)
      setSelectedState(storedState)
    }
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems)
      setItems(parsedItems)
      setOriginalItems(parsedItems)
    }
  }, [])

  const saveItemsToLocalStorage = (newItems: GroceryItem[]) => {
    localStorage.setItem("groceryItems", JSON.stringify(newItems))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setNewItemPrice(value);
    }
  }

  const handleItemNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemName.trim() !== '') {
      e.preventDefault() // Prevent form submission
      itemPriceInputRef.current?.focus()
    }
  }

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemPrice.trim() !== '') {
      e.preventDefault() // Prevent form submission
      addItem()
    }
  }

  const addItem = () => {
    if (newItemName && newItemPrice) {
      const newItem: GroceryItem = {
        id: Date.now(),
        name: newItemName,
        price: parseFloat(parseFloat(newItemPrice).toFixed(2))
      }
      const updatedItems = [...items, newItem]
      setItems(updatedItems)
      saveItemsToLocalStorage(updatedItems)
      setNewItemName("")
      setNewItemPrice("")
      
      if (itemNameInputRef.current) {
        itemNameInputRef.current.focus()
      }

      // Schedule the scroll after the state has been updated and the DOM has been re-rendered
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight
        }
      }, 0)
    }
  }

  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    saveItemsToLocalStorage(updatedItems)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxRate = selectedState ? states.find(s => s.name === selectedState)?.taxRate || 0 : 0
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [items])

  const handleBackToStep = () => {
    const hasUnsavedChanges = JSON.stringify(items) !== JSON.stringify(originalItems)
    const hasNewItemInput = newItemName.trim() !== '' || newItemPrice.trim() !== ''

    if (items.length === 0 && !hasNewItemInput) {
      // Cart is empty and no new item input, go back without confirmation
      router.push('/step/2')
    } else if (!hasUnsavedChanges && !hasNewItemInput) {
      // No unsaved changes and no new item input, go back without confirmation
      router.push('/step/2')
    } else {
      // Show confirmation modal
      setModalAction('back')
      setIsModalOpen(true)
    }
  }

  const handleClearList = () => {
    if (items.length > 0) {
      setModalAction('clear')
      setIsModalOpen(true)
    }
  }

  const handleConfirmAction = () => {
    setIsModalOpen(false)
    if (modalAction === 'back') {
      // Save changes and go back
      saveItemsToLocalStorage(items)
      router.push('/step/2')
    } else {
      // Clear the list
      setItems([])
      saveItemsToLocalStorage([])
    }
  }

  const handleCancelAction = () => {
    setIsModalOpen(false)
    if (modalAction === 'back') {
      // Discard changes and go back
      router.push('/step/2')
    }
    // For 'clear' action, just close the modal and do nothing
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addItem()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Card className="flex-grow flex flex-col rounded-none">
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToStep}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center flex-grow">Cart</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearList}
            className="h-10 w-10"
          >
            <Trash2 className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col relative px-4">
          <ul ref={listRef} className="flex-grow overflow-y-auto space-y-4 pb-32">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <span className="text-lg">{item.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-regular">{formatNumber(item.price)} {selectedCountry}</span>
                  <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)} className="h-10 w-10">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 pt-2 relative">
        <LinearBlur
          side="bottom"
          steps={16}
          strength={32}
          tint="rgba(255, 255, 255, 0.8)"
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateY(-100%)",
            height: "100px",
            pointerEvents: "none",
          }}
        />
        <div className="px-4">
          <div className="flex flex-col py-2 border-b border-gray-200 mb-2 w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Subtotal:</span>
              <span className="text-sm text-gray-500">{formatNumber(subtotal)} {selectedCountry}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-gray-800">{formatNumber(total)} {selectedCountry}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2 pb-4 w-full">
            <Input
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleItemNameKeyDown}
              className="w-full text-lg h-12 text-gray-800 font-normal placeholder-gray-400"
              ref={itemNameInputRef}
            />
            <div className="flex space-x-2 w-full">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Price"
                value={newItemPrice}
                onChange={handlePriceChange}
                onKeyDown={handlePriceKeyDown}
                className="flex-grow text-lg h-12 text-gray-800 font-normal placeholder-gray-400"
                ref={itemPriceInputRef}
              />
              <Button type="submit" size="icon" className="h-12 w-12">
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelAction}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        action={modalAction}
      />
    </div>
  )
}