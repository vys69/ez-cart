import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
  action: 'back' | 'clear'
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, onCancel, action }: ConfirmationModalProps) {
  const isClearing = action === 'clear'

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // If the dialog is being closed (open is false),
      // call onCancel and then onClose
      onCancel()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black border-2 border-[#383838] rounded-lg">
        <DialogHeader>
          <DialogTitle className='text-white'>{isClearing ? "Clear Cart?" : "Save Changes?"}</DialogTitle>
          <DialogDescription>
            {isClearing 
              ? "Are you sure you want to clear all items from your cart? This action cannot be undone."
              : "You have unsaved changes. Do you want to save them before going back?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <div className="w-full flex justify-between gap-4 flex-col">
            <Button 
              type="button" 
              variant="secondary" 
              className="flex-1 bg-[#383838] border-none rounded-lg text-white hover:bg-[#191919] hover:border-[#383838]" 
              onClick={isClearing ? onCancel : onConfirm}
            >
              {isClearing ? "No, cancel" : "Yes, save"}
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              className="flex-1" 
              onClick={isClearing ? onConfirm : onCancel}
            >
              {isClearing ? "Yes, clear cart" : "No, discard"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}