import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState({});
  const currentUserId = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.users.getById(currentUserId.userId).then((data) =>
      setData(() => ({
        ...data,
        qualities: transformQalities(data.qualities),
      }))
    );
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  function transformQalities(qualities) {
    return qualities.map((optionName) => ({
      label: optionName.name,
      value: optionName._id,
    }));
  }
  let us;

  if (data) {
    us = transformQalities(data?.qualities);
  }
  console.log(data?.qualities);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <TextField
            label="Имя"
            name="name"
            value={data?.name}
            onChange={handleChange}
          />
          <TextField
            label="Электронная почта"
            name="email"
            value={data?.email}
            onChange={handleChange}
          />
          <SelectField
            label="Выбери свою профессию"
            defaultOption="Choose..."
            name="profession"
            options={professions}
            onChange={handleChange}
            value={data?.profession?._id}
          />
          <RadioField
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "other", value: "other" },
            ]}
            value={data?.sex}
            name="sex"
            onChange={handleChange}
            label="Выберите ваши пол"
          />
          <MultiSelectField
            options={qualities}
            onChange={handleChange}
            defaultValue={data?.qualities}
            name="qualities"
            label="Выберите ваши качества"
          />
          <button className="btn btn-primary w-100 mx-auto" type="submit">
            Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
