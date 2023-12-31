import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import CustomizedTables from "../../../Utils/TableData";
import BasicModal from "../../components/modal/Modal";
import "../../styles/Style.scss";
import { AdminPopularContext } from "../../../context/AdminPopular";
import { useSnackbar } from "notistack";

interface adminPopularI {
  title: string;
  url: string;
  description: string;
}

const initialState: adminPopularI = {
  title: "",
  url: "",
  description: "",
};
function AdminPopular() {
  const { enqueueSnackbar } = useSnackbar();
  const { adminPopular, setAdminPopular } = useContext(AdminPopularContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [objFindingElem, setObjFindingElem] = useState<string>("");
  const [isDataReloader, setIsDataReloader] = useState<boolean>(false);

  const [popularData, setPopularData] = useState<adminPopularI | undefined>(
    initialState
  );

  useEffect(() => {
    if (isDataReloader) {
      setAdminPopular([...adminPopular!, popularData!]);
      enqueueSnackbar("Category Updated Successfully", { variant: "success" });
    }
  }, [isDataReloader]);

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPopularData({ ...popularData!, [e.target.name]: e.target.value });
  };

  const addHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEditMode) {
      setAdminPopular(
        adminPopular?.filter((item) => item.title !== objFindingElem)
      );
      setIsDataReloader(!isDataReloader);
      setIsModalOpen(!isModalOpen);
      setIsEditMode(false);
    } else {
      if (adminPopular === null) {
        setAdminPopular([{ ...popularData! }]);
        setPopularData(initialState);
        setIsModalOpen(!isModalOpen);
        enqueueSnackbar("Live video added successfully. ", {
          variant: "success",
        });
      } else {
        setAdminPopular([...adminPopular!, popularData!]);
        setPopularData(initialState);
        setIsModalOpen(!isModalOpen);
        enqueueSnackbar("Live video added successfully. ", {
          variant: "success",
        });
      }
    }
  };


  return (
    <>
      <div className="admin__category__wrapper">
        {" "}
        <BasicModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={popularData}
          setData={setPopularData}
        >
          <form className="admin__add__form" action="">
            <p>Add Popular Stream</p>
            <div className="form__input">
              <label htmlFor="">TITLE</label>
              <br />
              <input
                type="text"
                placeholder="enter title ..."
                name="title"
                value={popularData?.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  categoryHandler(e)
                }
              />
            </div>
            <div className="form__input">
              <label htmlFor="">URL</label>
              <br />
              <input
                type="text"
                placeholder="enter url ..."
                name="url"
                value={popularData?.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  categoryHandler(e)
                }
              />
            </div>
            <div className="form__input">
              <label htmlFor="">Description</label>
              <br />
              <input
                type="text"
                placeholder="enter url ..."
                name="description"
                value={popularData?.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  categoryHandler(e)
                }
              />
            </div>
            <div className="form__btn">
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  addHandler(e)
                }
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </BasicModal>
        <Container>
          <CustomizedTables
            arr={adminPopular}
            setArr={setAdminPopular}
            itemData={setPopularData}
            editMode={isEditMode}
            setEditMode={setIsEditMode}
            objFindingElem={objFindingElem}
            setObjFindingElem={setObjFindingElem}
          />
        </Container>
      </div>
    </>
  );
}

export default AdminPopular;
