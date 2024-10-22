import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import CheckoutSummary from './components/CheckoutSummary';
import { useCart } from './hooks/useCart';
import axios from 'axios';

const App: React.FC = () => {
  const { cartItems, addItemToCart, getTotalPrice } = useCart();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Function to handle adding product
  const handleAddToCart = () => {
    addItemToCart({ id: '1', name: 'T-Shirt', price: 20, quantity });
    toast({
      title: 'Product Added',
      description: `You have added ${quantity} T-Shirt(s) to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to apply coupon code
  const applyCoupon = () => {
    if (couponCode === 'DESCUENTO10') {
      setDiscount(0.1);
      toast({
        title: 'Coupon Applied',
        description: 'A 10% discount has been applied.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setDiscount(0);
      toast({
        title: 'Invalid Coupon',
        description: 'The entered code is not valid.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Calculate total with discount
  const getTotalWithDiscount = () => {
    const total = getTotalPrice();
    return total - total * discount;
  };

  // Function to handle proceeding to payment
  const handleProceedToPayment = async () => {
    console.log("Proceeding to payment..."); // Agrega este log
    const totalAmount = getTotalWithDiscount();
  
    try {
      const response = await axios.post('http://localhost:5000/api/buy/6716bdd9977852cebbf52fb6', {
        amount: totalAmount,
        code: couponCode,
      });
  
      if (response.status === 200) {
        toast({
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Payment Failed',
        description: error.response?.data?.message || 'An error occurred during payment processing.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box minH="100vh" bg="#F7FAFC" p={8}>
      <Flex direction="column" align="center" maxW="600px" mx="auto">
        <Heading mb={6} color="#2B6CB0" fontSize="3xl" fontWeight="bold">
          Checkout
        </Heading>

        <Stack spacing={4} w="100%" bg="white" p={6} rounded="lg" shadow="lg" borderWidth={1} borderColor="#E2E8F0">
          <CheckoutSummary items={cartItems} />

          {/* TextBox for product quantity */}
          <Flex align="center" justify="space-between">
            <NumberInput
              value={quantity}
              min={1}
              onChange={(value) => setQuantity(Number(value))}
              maxW="100px"
              mr={4}
            >
              <NumberInputField borderColor="#BEE3F8" borderRadius="md" />
            </NumberInput>
            <Button colorScheme="blue" onClick={handleAddToCart} borderRadius="md" _hover={{ bg: 'blue.600' }}>
              Add T-Shirt
            </Button>
          </Flex>

          {/* TextBox for coupon code */}
          <InputGroup size="md" mt={4}>
            <Input
              placeholder="Enter your coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              borderColor="#BEE3F8"
              borderRadius="md"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={applyCoupon} colorScheme="teal" borderRadius="md">
                Apply
              </Button>
            </InputRightElement>
          </InputGroup>

          {/* Total and payment button */}
          <Flex justify="space-between" align="center" mt={6}>
            <Text fontSize="xl" fontWeight="bold" color="#2D3748">
              Total: ${getTotalWithDiscount().toFixed(2)}
            </Text>
          </Flex>
        </Stack>

        {/* Payment Button */}
        <Button
          colorScheme="teal"
          size="lg"
          mt={6}
          w="100%"
          borderRadius="md"
          _hover={{ bg: 'teal.600' }}
          onClick={handleProceedToPayment} // Llama a la función al hacer clic
        >
          Proceed to Payment
        </Button>
      </Flex>
    </Box>
  );
};

export default App;
