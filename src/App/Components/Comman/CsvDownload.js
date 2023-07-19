import { CSVLink } from "react-csv";

export default function CsvDownload({ data, headers, filename }) {
    // console.log(data,'++++++');
    return (<>


        <CSVLink className="btn" data={data} headers={headers} filename={`${filename}.csv`}>
            <button className="edit-btn" style={{ marginLeft: "5px" }} >CSV Export</button>
        </CSVLink>
    </>)
}