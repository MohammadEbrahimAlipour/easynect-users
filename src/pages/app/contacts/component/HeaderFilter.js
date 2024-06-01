import {
  ContactsFilterIcon,
  ContactsImportIcon,
  SearchIcon,
} from "@/components/Icons";
import useFetch from "@/hooks/useFetch";
import { Menu, MenuItem } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function HeaderFilter({
  onChangeContractPage,
  contractPage,
  onSearchQuery,
  onShowExelSheet,
  onShowContactFilters,
}) {
  const contractPageFetch = useFetch();
  const [showOptions, setShowOptions] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    contractPageFetch.load({ url: "/api/v1/contacts/pages/" });
  }, []);

  useEffect(() => {
    const data = contractPageFetch.response?.data;
    if (data && Array.isArray(data) && data?.length) {
      onChangeContractPage(data?.[0]);
    }
  }, [contractPageFetch.response?.data]);

  const contractPageList = useMemo(() => {
    if (
      contractPageFetch.response?.data &&
      Array.isArray(contractPageFetch.response?.data)
    )
      return contractPageFetch.response?.data;
    return [];
  }, [contractPageFetch.response?.data]);

  const handlerSearch = useCallback(
    debounce((text) => {
      onSearchQuery(text);
    }, 800),
    [onSearchQuery]
  );

  const handleShowPagesDropdown = ({ currentTarget }) => {
    setAnchorEl(currentTarget);

    setShowOptions(true);
  };

  return (
    <div className="grid grid-cols-12 items-center justify-center">
      <div className=" col-span-8">
        <div className="grid grid-cols-12">
          <div className="col-span-4 flex justify-center items-center relative">
            <button
              onClick={handleShowPagesDropdown}
              className="w-full  
                        text-sm  font-medium shadow-sm
                        font-ravi truncate
                        border rounded-lg px-3 h-full border-black me-1 bg-dark text-white text-center"
            >
              {contractPage ? contractPage.card_title : "انتخاب"}
            </button>
            <Menu
              anchorEl={anchorEl}
              open={showOptions}
              onClose={() => {
                setShowOptions(false);
              }}
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                horizontal: "right",
              }}
            >
              {contractPageList.map((page) => (
                <MenuItem
                  key={page.id}
                  selected={page.id === contractPage?.id}
                  onClick={() => {
                    onChangeContractPage(page);
                    setShowOptions(false);
                  }}
                >
                  {page.card_title}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div
            className="flex justify-start items-center border-[1px] border-dark rounded-lg
          py-[12px] col-span-8"
          >
            <span className="ms-5">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder=""
              className="bg-light ms-2 px-3 w-full outline-none"
              value={inputSearch}
              onChange={(event) => {
                const text = event?.target?.value;
                setInputSearch(text);
                handlerSearch(text);
              }}
            />
          </div>
        </div>
      </div>
      <span
        onClick={() => onShowContactFilters(true)}
        className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg mx-1 font-ravi"
      >
        <ContactsFilterIcon />
      </span>
      <span
        onClick={() => onShowExelSheet(true)}
        className="col-span-2 border-[1px] border-dark p-[12px] rounded-lg flex justify-center items-center"
      >
        <ContactsImportIcon />
      </span>
    </div>
  );
}
