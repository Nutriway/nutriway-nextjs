import { serverFetcher } from '@/lib/fetchers/serverFetcher';
import { Appointment } from '@/types/Appointment';
import Image from 'next/image';
import { SingleStrapiResponse, StrapiResponse } from '@/types/StrapiResponse';
import { AppointmentPayment } from '@/types/AppointmentPayment';
import PaymentDialog from '@/components/Dialogs/PaymentDialog';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import Unpaid from '@/app/@client/(content)/paymentResult/Unpaid';

type PaymentResultPageParams = {
    searchParams: {
        session_id: string;
    };
};

type Metadata = {
    appointmentId: number;
    nutritionistName: string;
    goal: string;
    date: string;
    clientName: string;
};

async function getPaymentStatus(session_id: string) {
    return serverFetcher<{
        payment_status: 'unpaid' | 'paid';
        metadata: Metadata;
    }>({
        url: '/appointment-payment/getPaymentStatus',
        method: 'post',
        body: {
            session_id,
        },
    });
}

async function getUnpaidAppointment(appointmentId: number) {
    return serverFetcher<StrapiResponse<Appointment>>({
        url: `/appointments?populate[appointment_payment][populate]&filters[appointment_payment][status]=unpaid&filters[id]=${appointmentId}`,
        method: 'get',
    });
}

async function updateAppointmentPayment(paymentId: number, payment_status: string) {
    return serverFetcher<SingleStrapiResponse<AppointmentPayment>>({
        url: `/appointment-payments/${paymentId}`,
        method: 'put',
        body: {
            data: {
                status: payment_status,
            },
        },
    });
}

export default async function PaymentResultPage({ searchParams }: PaymentResultPageParams) {
    const { payment_status, metadata } = await getPaymentStatus(searchParams.session_id);
    const appointment = await getUnpaidAppointment(metadata.appointmentId);

    if (
        appointment.data.length > 0 &&
        appointment.data[0].attributes.appointment_payment &&
        payment_status === 'paid'
    ) {
        await updateAppointmentPayment(appointment.data[0].attributes?.appointment_payment?.data.id, payment_status);
    }

    const content = {
        paid: (
            <>
                <PaymentDialog />
                <div className="bg-white lightbg-gray-900 mx-auto max-w-3xl mt-0 px-4 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-xl">
                        <h1 className="text-base font-medium text-indigo-600">Obrigado!</h1>
                        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                            A sua consulta foi reservada!
                        </p>
                        <p className="mt-2 text-base text-gray-500">
                            A sua consulta foi reservada com sucesso. Receberá um email com detalhes.
                        </p>

                        <dl className="mt-12 text-sm font-medium">
                            <dt className="text-gray-900">O seu Nutricionista</dt>
                            <dd className="mt-2 text-indigo-600">{metadata.nutritionistName}</dd>
                        </dl>
                    </div>

                    <div className="mt-10 border-t border-gray-200">
                        <div className="flex space-x-6 border-b border-gray-200 py-10">
                            <Image
                                width={80}
                                height={80}
                                src={'/images/hero/woman.png'}
                                alt={'Nutritionist Image'}
                                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                            />
                            <div className="flex flex-auto flex-col">
                                <div>
                                    <h4 className="font-medium text-gray-900">
                                        <p>Consulta de nutrição</p>
                                    </h4>
                                    <p className="mt-2 text-sm text-gray-600">{metadata.goal}</p>
                                </div>
                                <div className="mt-6 flex flex-1 items-end">
                                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                        <div className="flex">
                                            <dt className="font-medium text-gray-900">Data</dt>
                                            <dd className="ml-2 text-gray-700">
                                                {format(new Date(metadata.date), 'yy/MM/dd HH:mm')}
                                            </dd>
                                        </div>
                                        <div className="flex pl-4 sm:pl-6">
                                            <dt className="font-medium text-gray-900">Cliente</dt>
                                            <dd className="ml-2 text-gray-700">{metadata.clientName}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Link
                                href="/home"
                                className="mt-10 w-64 text-primary-700 border border-green-700 hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                Voltar a página inicial
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        ),
        unpaid: <Unpaid />,
    };

    return content[payment_status];
}
