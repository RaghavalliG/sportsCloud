import { CSVLink } from "react-csv";

export default function CsvDownload({ data, headers, filename }) {
  // console.log(data,'++++++');
  return (
    <>
      <CSVLink data={data} headers={headers} filename={`${filename}.csv`}>
        <button className="edit-btn start-stream-btn w-auto px-3">
          CSV Export
        </button>
      </CSVLink>
    </>
  );
}
