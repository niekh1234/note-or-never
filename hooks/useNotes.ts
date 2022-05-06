import { Note } from 'interfaces/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from './redux';
import { populateIndex, searchIndex, updateIndex } from 'utils/search';

const useNotes = () => {
  const [hasPopulatedIndex, setHasPopulatedIndex] = useState(false);
  const {
    value: { total, items },
    status,
  } = useAppSelector((state) => state.notes);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (status === 'success') {
      setNotes(() => [...items]);
    }
  }, [items, status]);

  useEffect(() => {
    retrievePopulatedSearchIndex();
  }, [notes]);

  const retrievePopulatedSearchIndex = async () => {
    if (!items || !items.length) {
      return;
    }

    if (!searchIndex) {
      return items;
    }

    // create or update index
    if (!hasPopulatedIndex) {
      await populateIndex(notes);
      setHasPopulatedIndex(() => true);
    } else {
      console.log('updating...');
      await updateIndex(notes);
    }
  };

  const search = (query: string) => {
    if (searchIndex) {
      const searchResults = searchIndex.search(query);

      if (searchResults.length) {
        // retrieving all the notes by id from the search result
        let resultingNotes: Note[] = [];

        for (const result of searchResults[0].result) {
          const index = result as number;
          resultingNotes.push(items[index]);
        }

        setNotes(() => resultingNotes);
      } else {
        if (query) {
          setNotes(() => []);
        } else {
          setNotes([...items]);
        }
      }
    }
  };

  return {
    notes,
    total,
    search,
  };
};

export default useNotes;
