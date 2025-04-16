import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Define the Shop interface
export interface Shop {
  ownerUid: string;
  name: string;
}

// Function to get the list of shops for the customer
export const getCustomerShops = async (): Promise<Shop[]> => {
  try {
    // Fetch all the shops from the 'shops' collection
    const shopCollection = collection(firestore, 'shops');
    const shopSnapshot = await getDocs(shopCollection);

    // Map through the snapshot to get the required fields and return the result
    const shops: Shop[] = shopSnapshot.docs.map((doc) => ({
      ownerUid: doc.data().ownerUid,
      name: doc.data().shopName,
    }));

    return shops;
  } catch (error) {
    console.error("Error fetching shops: ", error);
    return [];
  }
};
