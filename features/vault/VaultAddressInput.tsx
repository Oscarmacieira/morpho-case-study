"use client";

import React, { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Address, isAddress } from "viem";
import { useDebounce } from "use-debounce";

import { AlertSvg } from "@/components/svgs/AlertSvg";
import { TickSvg } from "@/components/svgs/TickSvg";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIsMetaMorphoQuery } from "./useIsMetaMorphoQuery";
import { useVaultDataQuery } from "./useVaultDataQuery";
import { VaultCard } from "./VaultCard";

type FormData = {
  address: string;
};

export const VaultAddressInput: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>();

  const [isValidating, setIsValidating] = useState(false);

  const address = watch("address") as Address;
  const [debouncedAddress] = useDebounce<Address>(address, 300);

  const { data: isMetaMorpho, isError: rpcError } =
    useIsMetaMorphoQuery(debouncedAddress);

  useMemo(() => {
    if (!debouncedAddress) {
      clearErrors("address");
      setIsValidating(false);
      return;
    }

    if (!isAddress(debouncedAddress)) {
      setError("address", {
        type: "invalidInput",
        message: "Please enter a valid address",
      });
      setIsValidating(false);
      return;
    }

    setIsValidating(true);

    if (isMetaMorpho === false) {
      setError("address", {
        type: "invalidMetaMorpho",
        message: "Not a valid MetaMorpho vault",
      });
      setIsValidating(false);
    } else if (isMetaMorpho === true) {
      clearErrors("address");
      setIsValidating(false);
    }
  }, [debouncedAddress, isMetaMorpho, setError, clearErrors]);

  const onSubmit = handleSubmit(async (data) => {
    if (!isAddress(data.address)) {
      setError("address", {
        type: "invalidInput",
        message: "Please enter a valid address",
      });
      return;
    }

    if (rpcError) {
      setError("address", {
        type: "rpcError",
        message: "Failed to validate address",
      });
      return;
    }

    if (isMetaMorpho === false) {
      setError("address", {
        type: "invalidMetaMorpho",
        message: "Not a valid MetaMorpho vault",
      });
      return;
    }

    clearErrors("address");
  });

  const {
    isLoading: isVaultDataLoading,
    name,
    symbol,
  } = useVaultDataQuery(address);

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-[350px] mx-auto mt-[150px]">
        <CardContent className="py-[50px] px-[20px]">
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-alt opacity-70"
            >
              MetaMorpho Address
            </label>
            <div className="relative">
              <Input
                {...register("address")}
                variant="filled"
                type="text"
                placeholder="Enter MetaMorpho vault address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                endContent={
                  address ? (
                    isValidating ? null : isMetaMorpho === true ? (
                      <TickSvg />
                    ) : (
                      <AlertSvg />
                    )
                  ) : null
                }
              />
              {address && errors.address && (
                <p className="absolute text-sm text-destructive right-0 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="h-6"></div>
          </form>
        </CardContent>
      </Card>
      {isMetaMorpho && <VaultCard vaultAddress={address} />}
    </div>
  );
};
