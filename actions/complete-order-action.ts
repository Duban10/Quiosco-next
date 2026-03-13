"use server"

import { revalidatePath } from "next/cache";
import { OrderIdSchema } from "@/src/schema";
import prisma from "@/src/lib/prisma";

export const CompleteOrderAction = async (formData: FormData) => {
    // const orderId = formData.get('orderId');
    // const parsedOrderId = OrderIdSchema.parse({ orderId });

    const data = {
        orderId : formData.get('orderId'),
    }

    const result = OrderIdSchema.safeParse(data);
    console.log('desde completar ordern', result)
    if(result.success){
        const { orderId } = result.data;
        try {
            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now()),
                },
            });
            revalidatePath('/admin/orders');
        } catch (error) {
            console.log('error', error)
        }
    }
}