// components/CheckoutSummary.tsx
import React from 'react';
import { Box, Text, Divider } from '@chakra-ui/react';
import { CartItem } from '../hooks/useCart'; // Importamos CartItem desde useCart

interface Props {
  items: CartItem[];
}

const CheckoutSummary: React.FC<Props> = ({ items }) => {
  return (
    <Box>
      {items.length === 0 ? (
        <Text>No hay productos en el carrito.</Text>
      ) : (
        items.map((item) => (
          <Box key={item.id}>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
            <Divider my={2} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default CheckoutSummary;
