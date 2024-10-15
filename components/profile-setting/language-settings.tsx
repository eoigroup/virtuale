import React, { useState } from "react";
import { Typography } from "../ui/typography";
import TextField from "../text-field/text-field";
import { useUser } from "@/contexts/user-context";
import { Button } from "../ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUser } from "@/lib/api/user";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Select from "../select/select";
import { LangList } from "@/lib/lang";

interface PhoneNumberFormValues {
  fe_console_creator_lang: string;
}

// Define Zod validation schema
const validationSchema = z.object({
  fe_console_creator_lang: z
    .string()
    .min(1, { message: "Language is required" }),
});

const LanguageSettings = () => {
  const { user, updateSessionUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset, formState } =
    useForm<PhoneNumberFormValues>({
      defaultValues: {
        fe_console_creator_lang: user?.fe_console_creator_lang || "",
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
        Language
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end gap-3 flex-col"
      >
        <Controller
          control={control}
          name="fe_console_creator_lang"
          render={({ field }) => (
            <Select
              placeholder="Select a Language"
              label="Language"
              className="w-full"
              options={LangList.map((item) => ({
                value: item.value,
                label: item.Label,
              }))}
              {...field}
              error={formState.errors.fe_console_creator_lang}
            />
          )}
        />

        <Button
          loading={loading}
          disabled={loading || !formState.isValid || !formState.isDirty}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default LanguageSettings;
