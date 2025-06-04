import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (
    message: {
      title: string;
      description?: string | null;
    },
    action: "success" | "error" | "info" = "success"
  ) => {
    toast.show({
      placement: "bottom",
      duration: 3000,
      render: ({ id }) => (
        <Toast nativeID={id} action={action} variant="solid">
          <ToastTitle>{message.title}</ToastTitle>
          {message.description && (
            <ToastDescription>{message.description}</ToastDescription>
          )}
        </Toast>
      ),
    });
  };

  return { showToast };
};
