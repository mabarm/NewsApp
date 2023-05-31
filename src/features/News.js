import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {NewsMessages} from '../utils/constants/textLiterals';
import {commonStyles} from '../utils/constants/commonStyles';

function News({item, deleteNews, handlePin, pinnedNews}) {
  const swipeableRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNews(item);
    }, 0);
  };

  const pinItem = () => {
    handlePin(item);
    swipeableRef.current.close();
  };

  const renderRightActions = () => (
    <View style={styles.rightActionContainer}>
      {item?.title !== pinnedNews?.title && (
        <TouchableOpacity onPress={pinItem}>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>{NewsMessages.PIN}</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={deleteItem}>
        <View style={[styles.actionButton, styles.deleteButton]}>
          <Text style={[styles.actionText, styles.deleteButtonText]}>
            {NewsMessages.DELETE}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}>
      <View style={[styles.container, isDeleting && styles.deleteButton]}>
        <Text style={styles.title}>{item?.title}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16 * commonStyles.mpx,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1 * commonStyles.mpx,
    borderBottomColor: '#E0E0E0',
    borderRadius: 6 * commonStyles.mpx,
  },
  title: {
    fontSize: 16 * commonStyles.mpx,
    fontWeight: 'bold',
  },
  rightActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10 * commonStyles.mpx,
    paddingHorizontal: 20 * commonStyles.mpx,
    marginLeft: 10 * commonStyles.mpx,
    backgroundColor: 'green',
    borderRadius: 5 * commonStyles.mpx,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
});

export default React.memo(News);
