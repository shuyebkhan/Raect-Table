import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import DataTable from "react-data-table-component";

function CountriesTable() {
  const BASE_API = "https://restcountries.com/v2/all";

  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(BASE_API);
      setCountries(response.data);
      setFilterCountries(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },

    {
      name: "Capital",
      selector: (row) => row.capital,
    },

    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },

    {
      name: "Action",
      cell: (row) => (
        <button className="btn" onClick={() => alert(row.population)}>
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });

    setFilterCountries(result);
  }, [search]);
  return (
    <DataTable
      title="Countries List"
      columns={columns}
      data={filterCountries}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="630px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <button className="btn" style={{ position: "fixed", right: "4rem" }}>
          Export
        </button>
      }
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          style={{ width: "25%", height: "2rem" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
      subHeaderAlign="left"
    />
  );
}

export default CountriesTable;
