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
  const [professionsOptions, setProfessionsOptions] = useState();
  const [qualitiesOptions, setQualitiesOptions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.users.getById(currentUserId.userId).then((data) =>
      setData(() => ({
        ...data,
        qualities: transformQualities(data.qualities),
        profession: data.profession._id,
      }))
    );
    api.professions
      .fetchAll()
      .then((data) => setProfessionsOptions(transformProfessions(data)));
    api.qualities
      .fetchAll()
      .then((data) => setQualitiesOptions(transformQualitiesOptions(data)));
  }, []);

  console.log("qualities", qualities);
  console.log("qualitiesOptions", qualitiesOptions);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    console.log(data);
  };

  function transformQualitiesOptions(qualities) {
    return Object.keys(qualities).map((optionName) => ({
      label: qualities[optionName].name,
      value: qualities[optionName]._id,
    }));
  }

  function transformProfessions(qualities) {
    return Object.keys(qualities).map((optionName) => ({
      name: qualities[optionName].name,
      value: qualities[optionName]._id,
    }));
  }

  function transformQualities(qualities) {
    return qualities.map((optionName) => ({
      label: optionName.name,
      value: optionName._id,
    }));
  }

  function transformProfForData(id) {
    let newDataProfession;
    Object.keys(professions).map((prof) => {
      if (professions[prof]._id === id) {
        newDataProfession = professions[prof];
      }
    });
    return newDataProfession;
  }

  function transformQualForData() {
    let newDataProfession;
    Object.keys(professions).map((prof) => {
      if (professions[prof]._id === data.profession) {
        newDataProfession = professions[prof];
      }
    });
    return newDataProfession;
  }

  const handleUpdateUser = () => {
    api.users.update(currentUserId.userId, {
      ...data,
      profession: transformProfForData(data.profession),
    });

    // history.push(`/users/${currentUserId.userId}`);
  };

  if (data) {
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
              options={professionsOptions}
              onChange={handleChange}
              value={data?.profession}
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
              options={qualitiesOptions}
              onChange={handleChange}
              defaultValue={data?.qualities}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              type="submit"
              onClick={handleUpdateUser}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default EditUser;
