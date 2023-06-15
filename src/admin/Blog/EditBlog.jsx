import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Input, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../Globals/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const navigate = useNavigate();

  const [singleBlog, setSingleBlog] = React.useState({});
  const getSingleBlog = async () => {
    let res = await axios.get(`${baseUrl}/blog/${id}`);
    setSingleBlog(res.data);
  };
  React.useEffect(() => {
    getSingleBlog();
  }, []);

  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    image: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formsData = {
      title: formData.title || singleBlog.title,
      author: formData.author || singleBlog.author,
      description: formData.description || singleBlog.description,
      image: formData.image || singleBlog.image,
    };
    console.log(formData);
    await axios.put(`${baseUrl}blog/${id}`, formsData);
    navigate("/admin/home");
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 5 }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder={singleBlog.title}
        type="text"
        id="filled-basic"
        variant="filled"
        name="title"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        value={formData.title}
      />
      <Input
        placeholder={singleBlog.image}
        type="url"
        id="filled-basic"
        variant="filled"
        name="image"
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        value={formData.image}
        defaultValue={singleBlog.image}
      />
      <Input
        placeholder={singleBlog.author}
        id="filled-basic"
        variant="filled"
        name="author"
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        value={formData.author}
        defaultValue={singleBlog.author}
      />
      <Input
        placeholder={singleBlog.description}
        id="filled-basic"
        label="description"
        variant="filled"
        name="description"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        value={formData.description}
        defaultValue={singleBlog.description}
      />
      <Button type="submit" variant="contained">
        Edit blog
      </Button>
    </Box>
  );
}