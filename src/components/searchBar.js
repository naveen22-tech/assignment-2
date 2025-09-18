import React from "react";
import { Input } from "antd";

const SearchBar = ({ onSearch }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Input.Search
        placeholder="Search by name, email or company"
        onChange={(e) => onSearch(e.target.value)}
        allowClear
        style={{ maxWidth: 400 }}
      />
    </div>
  );
};

export default SearchBar;
