import React, { useState } from "react";
import { Typography } from "../ui/typography";
import TextField from "../text-field/text-field";
import { useUser } from "@/contexts/user-context";
import { Button } from "../ui/button";
import EmailUpdateModal from "../modal/email-update-modal/email-update-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUser } from "@/lib/api/user";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PhoneNumberFormValues {
  phone_number: string;
}

// Define Zod validation schema
const validationSchema = z.object({
  phone_number: z.string().min(1, { message: "Phone number is required" }),
});

const SecuritySettings = () => {
  const { user, updateSessionUser } = useUser();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState } =
    useForm<PhoneNumberFormValues>({
      defaultValues: {
        phone_number: user?.phone_number || "",
      },
      resolver: zodResolver(validationSchema),
    });

  const onSubmit: SubmitHandler<PhoneNumberFormValues> = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      await updateUser(data);
      await updateSessionUser();
      reset(data);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update phone number");
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Typography variant={"h3"} className="mb-3">
        Security
      </Typography>

      <div className="flex items-center gap-3">
        <TextField
          name="user-email"
          label="Email"
          className="bg-surface-elevation-3"
          containerClassName="w-full"
          value={user!.email}
          disabled
        />
        <Button
          variant={"link-outlined"}
          className="p-0 mt-4 h-auto"
          onClick={() => setIsOpenModal(true)}
        >
          Edit
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <TextField
          {...register("phone_number")}
          label="Phone Number"
          className="bg-surface-elevation-3"
          containerClassName="w-full"
        />

        <Button
          variant={"link-outlined"}
          className={cn("p-0 mt-4 h-auto", {
            "opacity-0": !formState.isDirty || !formState.isValid,
          })}
          loading={loading}
          type="submit"
        >
          Edit
        </Button>
      </form>

      <EmailUpdateModal isOpen={isOpenModal} onClose={setIsOpenModal} />
    </div>
  );
};

export default SecuritySettings;
