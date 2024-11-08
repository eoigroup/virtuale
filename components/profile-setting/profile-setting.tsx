import React, { useState } from "react";
import TextField from "../text-field/text-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";
import { updateUser } from "@/lib/api/user";
import { cn, getDirtyValues } from "@/lib/utils";
import UserAvatar from "../user-avatar/user-avatar";

type FormValues = {
  username: string;
  nickname: string;
  interest: string;
  self_describe: string;
  creator_balance: string;
};
const validationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  nickname: z.string(),
  interest: z.string(),
  self_describe: z.string(),
  creator_balance: z.string(),
});

const ProfileSetting = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateSessionUser: getSessionUser } = useUser();
  const { register, handleSubmit, trigger, reset, getValues, formState } =
    useForm<FormValues>({
      defaultValues: {
        username: user?.username || "",
        nickname: user?.nickname || "",
        interest: user?.interest || "",
        self_describe: user?.self_describe || "",
        creator_balance: String(user?.creator_balance || ""),
      },
      resolver: zodResolver(validationSchema),
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (loading) return;

    setLoading(true);
    try {
      const payload = getDirtyValues(getValues, formState.dirtyFields);
      const { data } = await updateUser(payload);
      toast.success(data.reply);
      getSessionUser();
      reset(values);
      trigger();
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-4 justify-between h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant={"h3"} className="mb-3">
        Profile
      </Typography>
      <div className="space-y-4 flex-1">
        <UserAvatar className="w-20 h-20" variant="large" editable />

        <TextField
          label="Username"
          {...register("username")}
          className="bg-surface-elevation-3"
          error={errors.username}
        />
        <TextField
          label="Nickname"
          {...register("nickname")}
          className="bg-surface-elevation-3"
          error={errors.nickname}
        />
        <TextField
          label="Interest"
          {...register("interest")}
          className="bg-surface-elevation-3"
          error={errors.interest}
        />
        <TextField
          label="Self Description"
          {...register("self_describe")}
          className="bg-surface-elevation-3"
          error={errors.self_describe}
        />
        <TextField
          label="Balance"
          {...register("creator_balance")}
          className="bg-surface-elevation-3"
          disabled
          error={errors.creator_balance}
        />
      </div>

      {formState.isDirty && formState.isValid && (
        <div
          className={cn("flex justify-end gap-4 transition-all duration-300")}
        >
          <Button
            type="button"
            onClick={() => reset()}
            disabled={loading}
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button loading={loading}>Save</Button>
        </div>
      )}
    </form>
  );
};

export default ProfileSetting;
