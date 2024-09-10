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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className='text-black'>Save Changes?</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Do you want to save them before {action === 'back' ? 'going back' : 'clearing the cart'}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <div className="w-full flex justify-between gap-4 flex-col">
            <Button type="button" variant="secondary" className="flex-1 text-black hover:bg-gray-200" onClick={onConfirm}>
              Yes, save
            </Button>
            <Button type="button" variant="destructive" className="flex-1" onClick={onCancel}>
              No, discard
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}