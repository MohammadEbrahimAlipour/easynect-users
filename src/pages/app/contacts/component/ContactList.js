import InfiniteScroll from "react-infinite-scroll-component";
import LoadingState from "@/components/LoadingState";
import ContactsCards from "@/components/contacts/ContactsCards";
import useFetch from "@/hooks/useFetch";
import { memo, useEffect, useState } from "react";

const ContactList = ({ contractPage, fromDate, toDate, searchQuery }) => {
  const contractFetch = useFetch();
  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    if (contractPage?.id) {
      setContractList([]);
      getData(true);
    }
  }, [contractPage, fromDate, toDate, searchQuery]);

  useEffect(() => {
    const data = contractFetch.response?.data;
    if (data && data?.length) {
      setContractList([...contractList, ...data]);
    }
  }, [contractFetch.response?.data]);

  const getData = (freshData = false) => {
    contractFetch.load({
      url: `/api/v1/contacts/page/unified/${contractPage?.id}`,
      params: {
        skip: freshData ? 0 : contractList.length,
        limit: 4,
        from_date: fromDate,
        to_date: toDate,
        search: searchQuery || null
      }
    });
  };

  return (
    <div className="max-h-full px-2 overflow-hidden">
      <InfiniteScroll
        dataLength={contractList.length}
        next={getData}
        hasMore={true}
        // loader={noMoreContacts ? null : <LoadingState />}
      >
        {contractList.map((contact) => (
          <ContactsCards contact={contact} key={contact.guid} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default memo(ContactList);
