import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Search = () => {
  const insets = useSafeAreaInsets();

  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      className="bg-white h-full ">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isRightColItem = index % 2 === 1;
          return (
            <View
              className={cn(
                "flex-1 max-w-[50%]",
                isRightColItem ? "mt-8" : "mt-0"
              )}>
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter
              categories={
                categories
                  ? categories.map((cat: any) => ({
                      $id: cat.$id,
                      name: cat.name,
                      description: cat.description,
                      $collectionId: cat.$collectionId,
                      $databaseId: cat.$databaseId,
                      $createdAt: cat.$createdAt,
                      $updatedAt: cat.$updatedAt,
                      $permissions: cat.$permissions,
                    }))
                  : []
              }
            />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No Results</Text>}
      />
    </View>
  );
};
export default Search;
