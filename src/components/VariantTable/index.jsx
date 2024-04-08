import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { COLORS } from "../../constants/colors";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/material";

export default function VariantTable({ columns, rows }) {

  const handleEditCellStop = (params) => {
    console.log("🚀 ~ handleEditCellStop ~ params:", params)
  };
  return (
    <div style={{ height: 300, width: "100%" }}>
      <Box
        mt={4}
        sx={{
          // height: 300,
          // width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: COLORS?.PrimaryBlue,
            color: COLORS?.PrimaryWhite
          },
        }}
      >
        <DataGrid
          disableColumnFilter={true}
          disableColumnSelector={true}
          // onCellEditStart={handleEditCellChange}
          onCellEditStop={handleEditCellStop}
          className="customDataGrid"
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            ".customDataGrid .MuiDataGrid-columnHeader": {
              backgroundColor: COLORS?.PrimaryBlue,
              color: 'white',
            }

          }}
          rows={rows}
          columns={columns}
          pageSize={rows.length}
        />
      </Box>
    </div>
  );
}

// const columns = [
//   {
//     field: "name",
//     headerName: "Variants",
//     // width: 180,
//     editable: true, headerClassName: 'super-app-theme--header',
//   },
//   {
//     field: "size",
//     headerName: "Bead Size",
//     type: "number",
//     editable: true,
//     align: "left",
//     headerClassName: 'super-app-theme--header',
//     headerAlign: "left",
//   },
//   {
//     field: "metal_weight",
//     headerName: "Metal Weight",
//     type: "date",
//     // width: 180,
//     headerClassName: 'super-app-theme--header',
//     editable: true,
//   },
//   {
//     field: "setting",
//     headerName: "Setting",
//     type: "dateTime",
//     // width: 220,
//     headerClassName: 'super-app-theme--header',
//     editable: true,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     size: 25,
//     metal_weight: randomCreatedDate(),
//     setting: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     size: 36,
//     metal_weight: randomCreatedDate(),
//     setting: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     size: 19,
//     metal_weight: randomCreatedDate(),
//     setting: randomUpdatedDate(),
//   },
// ];
