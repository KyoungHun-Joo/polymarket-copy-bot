import { ClobClient } from '@polymarket/clob-client';

type OrderBook = Awaited<ReturnType<ClobClient['getOrderBook']>>;

const isMissingOrderBookError = (error: unknown): boolean => {
    const status = (error as { response?: { status?: number } })?.response?.status;
    const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        (error as { message?: string })?.message;

    return status === 404 && typeof message === 'string' && message.includes('No orderbook exists');
};

export const getOrderBookSafe = async (
    clobClient: ClobClient,
    tokenId: string,
    onMissing?: (message: string) => void
): Promise<OrderBook | null> => {
    try {
        return await clobClient.getOrderBook(tokenId);
    } catch (error) {
        if (isMissingOrderBookError(error)) {
            const message =
                (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
                'No orderbook exists for the requested token id';
            if (onMissing) {
                onMissing(message);
            }
            return null;
        }
        throw error;
    }
};
