import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { ListingType } from "@/types/listingType";

type Props = {
  listings: any[];
};

const Listings = ({ listings }: Props) => {
  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <TouchableOpacity>
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={listings}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({});
