
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SearchStudent = () => {
    const departmentData = [
        {id: 1, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 2, name: "บัญชี"},
        {id: 3, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 4, name: "บัญชี"},
        {id: 5, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 6, name: "บัญชี"},
        {id: 7, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 8, name: "บัญชี"},
        {id: 9, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 10, name: "บัญชี"},
        {id: 11, name: "คอมพิวเตอร์ธุรกิจ"},
        {id: 12, name: "บัญชี"},
      ]

      const degreeData = [
        {id: 1, name: "ปวช.1"},
        {id: 2, name: "ปวช.2"},
        {id: 3, name: "ปวช.3"},
        {id: 4, name: "ปวส.1"},
        {id: 5, name: "ปวส.2"}
      ]

      const roomData = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},
        {id: 3, name: "3"},
        {id: 4, name: "4"},
      ]

 

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-helper-label">แผนก</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departmentData.map((data, index) => (
            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">ชั้น</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {degreeData.map((data, index) => (
            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">ห้อง</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {roomData.map((data, index) => (
            <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </>
  );
};

export default SearchStudent;
