import { useRootStore } from "src/store/root";
import { ModalType } from "src/types/modal";

export default function useModal() {
  const setModal = useRootStore((store) => store.setModal);

  const open = (type: ModalType) => setModal({ type, open: true });
  const close = (type: ModalType) => setModal({ type, open: false });

  return { open, close };
}
