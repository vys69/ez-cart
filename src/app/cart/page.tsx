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
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface GroceryItem {
  id: number
  name: string
  price: number
}

const formatNumber = (num: number | null | undefined): string => {
  if (num == null) return '0.00'; // Return '0.00' for null or undefined
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Cart() {
  const router = useRouter()
  const { toast } = useToast()
  const [items, setItems] = useState<GroceryItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<'back' | 'clear'>('back')
  const [originalItems] = useState<GroceryItem[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  const itemNameInputRef = useRef<HTMLInputElement>(null)
  const itemPriceInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")
    
    if (storedCurrency) {
      setSelectedCountry(storedCurrency)
      if (storedCurrency === 'USD' && storedState) {
        setSelectedState(storedState)
      }
    }

    // Load items from localStorage
    const storedItems = localStorage.getItem("groceryItems")
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  const saveItemsToLocalStorage = (newItems: GroceryItem[]) => {
    localStorage.setItem("groceryItems", JSON.stringify(newItems))
  }

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 265) {
      setNewItemName(value);
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and a single decimal point, max 10 digits before decimal
    if (/^\d{0,10}(\.\d*)?$/.test(value)) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log

    if (newItemName.length > 100) {
      console.log("Item name too long"); // Debug log
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Item name cannot exceed 100 characters.",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
      setNewItemName("");
      return;
    }

    if (newItemPrice.split('.')[0].length > 10) {
      console.log("Price too long"); // Debug log
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Price cannot exceed 10 digits before the decimal point.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setNewItemPrice("");
      return;
    }

    console.log("Validation passed, calling addItem"); // Debug log
    addItem();
  }

  const addItem = () => {
    console.log("addItem called"); // Debug log
    if (newItemName.trim() && newItemPrice.trim()) {
      const price = parseFloat(newItemPrice);
      if (isNaN(price) || !isFinite(price)) {
        console.log("Invalid price"); // Debug log
        toast({
          variant: "destructive",
          title: "Input Error",
          description: "Please enter a valid price.",
        });
        setNewItemPrice("");
        return;
      }
      const newItem: GroceryItem = {
        id: Date.now(),
        name: newItemName.trim(),
        price: parseFloat(price.toFixed(2))
      };
      console.log("New item:", newItem); // Debug log
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveItemsToLocalStorage(updatedItems);
      setNewItemName("");
      setNewItemPrice("");
      
      if (itemNameInputRef.current) {
        itemNameInputRef.current.focus();
      }
  
      // Schedule the scroll after the state has been updated and the DOM has been re-rendered
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 0);
    } else {
      console.log("Item name or price is empty"); // Debug log
    }
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    saveItemsToLocalStorage(updatedItems)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxRate = selectedCountry === 'USD' && selectedState && selectedState !== " " ? 
    states.find(s => s.name === selectedState)?.taxRate || 0 : 0
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

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">
      <Card className="flex-grow flex flex-col rounded-none overflow-auto border-none">
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToStep}
            className="h-10 w-10 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center flex-grow text-white">Cart</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearList}
            className="h-10 w-10 text-white"
          >
            <Trash2 className="h-6 w-6" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col relative px-4">
          <ul ref={listRef} className="flex-grow overflow-y-auto space-y-4 pb-32">
            {items.map(item => (
              <li 
                key={item.id} 
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#191919] border-none hover:bg-[#383838] transition-all duration-300 ease-in-out p-4 rounded-lg shadow fade-in ${
                  items.length > 1 ? 'staggered-animation' : ''
                }`}
              >
                <span className="text-xl break-words mr-2 mb-2 sm:mb-0 w-full sm:w-auto text-white">{item.name}</span>
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-md font-regular whitespace-nowrap text-white">
                    {formatNumber(item.price)} {selectedCountry !== " " ? selectedCountry : ''}
                  </span>
                  <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)} className="h-10 w-10 flex-shrink-0 bg-[#191919]">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 w-full bg-[#000000] pt-2 relative">
        <LinearBlur
          side="bottom"
          steps={16}
          strength={32}
          tint="rgba(0, 0, 0, 1)"
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateY(-100%)",
            height: "100px",
            pointerEvents: "none",
          }}
        />
        <div className="px-4">
          <div className="flex flex-col py-2 mb-2 w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Subtotal:</span>
              <span className="text-sm text-white">
                {formatNumber(subtotal)} {selectedCountry !== " " ? selectedCountry : ''}
              </span>
            </div>
            {selectedCountry === 'USD' && selectedState !== " " && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-white">Tax ({taxRate}%):</span>
                <span className="text-sm text-white">
                  {formatNumber(taxAmount)} {selectedCountry}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-bold text-white">Total:</span>
              <span className="text-lg font-bold text-white">
                {formatNumber(total)} {selectedCountry !== " " ? selectedCountry : ''}
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2 pb-4 w-full">
            <Input
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={handleItemNameChange}
              onKeyDown={handleItemNameKeyDown}
              className="w-full text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
              ref={itemNameInputRef}
              maxLength={265}
            />
            <div className="flex space-x-2 w-full">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Price"
                value={newItemPrice}
                onChange={handlePriceChange}
                onKeyDown={handlePriceKeyDown}
                className="flex-grow text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
                ref={itemPriceInputRef}
              />
              <Button type="submit" size="icon" className="h-12 w-12 text-white">
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