import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
  action: 'back' | 'clear'
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, onCancel, action }: ConfirmationModalProps) {
  const title = action === 'back' ? "Save Changes?" : "Clear List?"
  const description = action === 'back' 
    ? "You have unsaved changes. Do you want to save them before going back?"
    : "Are you sure you want to clear the entire list? This action cannot be undone."
  const confirmText = action === 'back' ? "Yes, save" : "Yes, clear"
  const cancelText = action === 'back' ? "No, discard" : "No, keep list"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-black">{title}</DialogTitle>
          <DialogDescription className="text-center mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col space-y-2 mt-6">
          <Button 
            onClick={onConfirm}
            className={`w-full ${action === 'back' ? 'bg-white text-black border border-gray-300 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'}`}
          >
            {confirmText}
          </Button>
          <Button 
            onClick={onCancel}
            className={`w-full ${action === 'back' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}`}
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}