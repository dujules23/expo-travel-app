import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import destinationCategories from "@/data/categories";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const CategoryButtons = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });

    onCategoryChanged(destinationCategories[index].title);
  };

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {destinationCategories.map((item, index) => (
          <TouchableOpacity
            ref={(el) => (itemRef.current[index] = el)}
            onPress={() => handleSelectCategory(index)}
            key={index}
            style={
              activeIndex === index
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <MaterialCommunityIcons
              name={item.iconName as any}
              size={20}
              color={activeIndex == index ? Colors.white : Colors.black}
            />
            <Text
              style={
                activeIndex == index
                  ? styles.categoryBtnTextActive
                  : styles.categoryBtnText
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnText: {
    marginLeft: 5,
    color: Colors.black,
  },
  categoryBtnTextActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});
