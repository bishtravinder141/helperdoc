import React from "react";
import { useTranslation } from "react-i18next";

const TableHeader = ({ data }) => {
    const { t } = useTranslation();
  return (
    <thead>
      <tr>
        {data.map((heading, index) => (
          <th key={index}>{t(heading)}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
