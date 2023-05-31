import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

import News from './News';
import useNewsList from '../utils/hooks/useNewsList';
import {NewsMessages} from '../utils/constants/textLiterals';
import {commonStyles} from '../utils/constants/commonStyles';

const itemsPerPage = 10;

function NewsList() {
  const {newsData, pinnedNews, deleteNews, handlePin, loadNextNews} =
    useNewsList();

  const renderItem = ({item}) => (
    <News
      item={item}
      deleteNews={deleteNews}
      handlePin={handlePin}
      pinnedNews={pinnedNews}
    />
  );

  const keyExtractor = (item, index) => item.publishedAt + index;

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.container}>
      {pinnedNews && (
        <View style={styles.pinnedMessageContainer}>
          <Text style={styles.pinnedMessageText}>
            {NewsMessages.PINNED_NEWS} {pinnedNews?.title}
          </Text>
        </View>
      )}
      <FlatList
        data={newsData}
        inverted={true}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={loadNextNews}
        initialNumToRender={itemsPerPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  pinnedMessageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4 * commonStyles.mpx,
    paddingVertical: 20 * commonStyles.mpx,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinnedMessageText: {
    color: 'white',
    fontSize: 16 * commonStyles.mpx,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16 * commonStyles.mpx,
    paddingVertical: 12 * commonStyles.mpx,
  },
  itemSeparator: {
    height: 1 * commonStyles.mpx,
    marginTop: 5 * commonStyles.mpx,
    backgroundColor: '#E0E0E0',
  },
});

export default React.memo(NewsList);
