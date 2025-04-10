import axios from "axios";

export const getAll = async () => {
  const {data} = await axios.get('/api/stuffs');
  return data;
};

export const search = async searchTerm => {
  const {data} = await axios.get('/api/stuffs/search/' + searchTerm);
  return data;
}


export const getAllTags = async () => {
  const {data} = await axios.get('/api/stuffs/tags');
  return data;
}

export const getAllByTag = async tag => {
  if (tag === 'All') return getAll();
  const {data} = await axios.get('/api/stuffs/tag/'+ tag);
  return data;
};

export const getById = async stuffId => {
  const {data} = await axios.get('/api/stuffs/' + stuffId);
  return data;
}
  