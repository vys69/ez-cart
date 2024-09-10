import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalConfig {
  id: 'back' | 'clear';
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ModalConfig;
}

export function ConfirmationModal({ isOpen, onClose, config }: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-[425px] bg-black border-2 border-[#383838] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-white">{config.title}</DialogTitle>
          <DialogDescription>{config.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-2">
          <Button variant="default" onClick={onClose}>
            {config.cancelText}
          </Button>
          <Button variant="destructive" onClick={() => {
            config.onConfirm();
            onClose();
          }}>
            {config.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}