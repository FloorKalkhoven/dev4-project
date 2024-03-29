import React, {useEffect, useState} from "react";
import "../css/tables.css"
import get_tables, {delete_table} from "../connect_backend";
import AddTable from "../components/AddTable";
import EditTable from "../components/EditTable"

export default function Tables({medewerker}) {
    const [tables, setTables] = useState([]);

    if (!medewerker) {
        window.location.href = "/login";
    }
    useEffect(function getTables() {
        get_tables(setTables)
    }, []);


    // display every table
    // if the table is being edited, display the form
    // if the table is not being edited, display the table
    const boxes = tables.map((table, index) => {
            // select the table that is being edited
            if (table.editing === true) {
                return (
                    <EditTable table={table} id={table.tafel_id} key={table.tafel_id}/>
                )
            } else {
                return (
                    <div className={"table"} key={table.tafel_id}>
                        <h4 className={"table-number"}>Tafelnummer: {table.tafel_id}</h4>
                        <h4 className={"table--persons"}>{table.aantal_personen} personen</h4>
                        <h4 className={"table--location"}>tafel bevindt zich {table.locatie}</h4>
                        <h4 className={"table--floor"}>Verdieping {table.verdieping}</h4>
                        <h4 className={"table--seating"}>Type zitting: {table.type_zitting}</h4>
                        <span><button className={"button-add-table"} onClick={() => {
                            const copyTables = [...tables];
                            copyTables[index].editing = true;
                            setTables(copyTables)
                        }
                        }>Pas gegevens aan
                        </button>

                        <button className={"delete-button"} onClick={() => {
                            //check if the user wants to delete the table
                            if (window.confirm("Weet je zeker dat je deze tafel wilt verwijderen?")) {
                                //make tafel_id a string
                                const tafel_id = table.tafel_id
                                delete_table(tafel_id);
                                const copyTables = [...tables];
                                copyTables.splice(index, 1);
                                setTables(copyTables);
                                alert("Tafel verwijderd")
                            } else {

                            }
                        }}>✖</button>
                        </span>
                    </div>
                )
            }
        }
    )
    return (
        <div>
            <h1>Tafels</h1>
            <div className={"all-tables"}>
                {tables ? boxes : <div>Er zijn nog geen tafels</div>}
                { // onclick of a button, load the add table form
                }<AddTable/>
            </div>
        </div>
    )
}