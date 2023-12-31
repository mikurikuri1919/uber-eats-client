"use client";

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useEachFoodCount } from '@/features/foods/hooks/useEachFoodCount';
import { ConfirmFoodModalProps, ClickReplaceOrderResultProps } from '@/features/foods/types';
import { useClickReplaceOrder } from '@/features/foods/hooks/useClickReplaceOrder';

export default function ConfirmFoodModal({
    showConfirmModal,
    setShowConfirmModal,
    food,
  }: ConfirmFoodModalProps): React.ReactElement {
    const foodId = food?.id ?? '';
    const { eachFoodCount } = useEachFoodCount(foodId);

    const {
      isLoading,
      success,
      error,
      onClickReplaceOrder,
    }: ClickReplaceOrderResultProps = useClickReplaceOrder(foodId, eachFoodCount, setShowConfirmModal);

  return (
    <Transition.Root show={showConfirmModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowConfirmModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-1 text-center sm:mt-3">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    新規注文を開始しますか？
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {
                          `ご注文に existingResutaurautName の商品が含まれています。
                          新規の注文を開始して newResutaurautName の商品を追加してください。`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    買い物を続ける
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => onClickReplaceOrder()}
                  >
                    新規注文を開始する
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

