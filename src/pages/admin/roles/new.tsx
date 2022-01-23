import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import React, { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import {
  createRole
} from 'redux/actions/role'
import { ToastContainer } from "react-toastify";
import MultipleSelect from '@component/multipleSelect';
import { getPermissions } from "@redux/actions/permission";

const RoleEditor = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { createRoleloading = false, createRoleSuccess=false } = useSelector((state) => state.role)

  const firstUpdate = useRef(true);
  const [foundError, setFoundError] = useState(null)
  const {error:permissionError=null,permissions =null}= useSelector((state) => state.permission)
  const [loading , setLoading]= useState(true)
 const [permissionsData,setPermissionsData]= useState([])
  console.log(foundError,loading)

  useEffect(() => {
  setLoading(true)
    dispatch(getPermissions())
    firstUpdate.current = false
  }, [dispatch])

  useEffect(() => {
    if(permissionError && !firstUpdate.current){
        setFoundError(permissionError)
      }
    else if (permissions && permissions.data) {
        setPermissionsData([])
        console.log("permissions",permissions.data)
        permissions.data.map((item) => {
        setPermissionsData((prevState) => [...prevState, { value: item._id, label: item.name }]);
        })
        
    }
  }, [permissions])

  useEffect(() => {
    if (createRoleSuccess) {
      if (router.query.redirect) {
        router.push(`/${router.query.redirect}`);
      } else {
        router.push("/");
      }

    }
  }, [createRoleSuccess])

  const handleFormSubmit = async (values) => {
    try {
      values.permissions = values.role_permissions.map((item) => { return item.value })
      const {  role_permissions, ...rest } = values
      await dispatch(createRole(rest))
      router.push("/admin/roles");
    } catch (e) {
      console.log("got error", e)
      setFoundError(e.message)

    }
  };




  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled" from="Admin"
        title="Add new role"
        button={
          <Link href="/admin/roles">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Roles
            </Button>
          </Link>
        }
      />
      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px" mt="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="name"
                      label="Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
  

                  <Grid item md={6} xs={12}>
                    <MultipleSelect
                      label="Permissions"
                      placeholder="Select Permissions"
                      options={permissionsData}
                      value={values.role_permissions || ""}
                      onChange={(p) => {
                        setFieldValue("role_permissions", p);
                      }}
                      errorText={touched.role_permissions&& errors.role_permissions}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={true}>
                {createRoleloading && <Spinner />}
                Create Role
              </Button>
            </form>
          )}
        </Formik>
       </Card1>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const initialValues = {
  name: "",
  role_permissions: null,
  activated: false,
};
const formSchema = yup.object().shape({
  name: yup.string().required("${path} is required"),
  role_permissions: yup.array().nullable(),
 

});


RoleEditor.layout = AdminDashboardLayout;

export default RoleEditor;