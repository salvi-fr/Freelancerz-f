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
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
  import {
    updateRole,getRole
  } from 'redux/actions/role'
import MultipleSelect from '@component/multipleSelect';
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import {
  getPermissions
} from 'redux/actions/permission'
import Spinner from "@component/Spinner";
import { IPermission } from "types";

const EditRole = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {error:roleError=null}= useSelector((state) => state.role)
  const {role:fechedRole=null}= useSelector((state) => state.role)
  const {updateRoleloading=false}= useSelector((state) => state.role)
  const { permissions=null}= useSelector((state) => state.permission)
  const {error:permissionError=null}= useSelector((state) => state.permission)
  const {updateRoleSuccess=false}= useSelector((state) => state.role)
  const [roleMock, setRoleMock]=useState(null)
  const [loading , setLoading]= useState(true)
 const [permissionsData,setPermissionsData]= useState([])
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const [curriculum, setCurriculum] = useState(
    null
)
console.log(foundError)
  useEffect(() => {
setLoading(true)
    dispatch(getPermissions())
    dispatch(getRole(id as string))
    firstUpdate.current = false
  }, [dispatch])


  useEffect(() => {
    if(roleError && !firstUpdate.current){
        setFoundError(roleError)
      }
  }, [roleError])


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
    
    if(fechedRole){
      console.log("fechedRole",fechedRole)
      let pM = fechedRole.permissions? fechedRole.permissions as IPermission[]: []
 
      setRoleMock({...fechedRole, 
        role_perminssions: permissionsData.filter(function(array_el){
          return pM.filter(function(anotherOne_el){
             return anotherOne_el._id as string == array_el.value;
          })
       }),
        
      })
      setLoading(false)
      }
  }, [fechedRole])


useEffect(() => {
  if(updateRoleSuccess && !loading){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/roles");
    }
    
  }
}, [updateRoleSuccess])
  const handleFormSubmit = async (values) => {
    try {
      values.permissions=values.role_perminssion.map((item)=>{return item.value})
     let {_id,created_by,createdAt,role_perminssions,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
   console.log(rest)
      await dispatch(updateRole(id as string,rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
  
    <div>
      
      <DashboardPageHeader
        iconName="credit-card_filled"
        from="Admin"
        title="Edit Role"
        button={
          <Link href="/admin/roles">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Roles
            </Button>
          </Link>
        }
      />
      <Card1>
      {!roleMock || loading? <p>Loading</p>:
      <>
      <RichTextEditor
                content={curriculum}
                handleContentChange={(curriculum) => setCurriculum(curriculum)}
                placeholder="insert curriculum here ...."
            />
        <Formik
          initialValues={roleMock}
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
                      name="title"
                      label="Title"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title || ""}
                      errorText={touched.title && errors.title}
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
                    errorText={touched.role_permissions && errors.role_permissions}
                  />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!curriculum || updateRoleloading }>
              {updateRoleloading && <Spinner  />}
                Update Role
              </Button>
            </form>
          )}
        </Formik>
        </>}
      </Card1>

    </div>
                  
  );
};


const formSchema = yup.object().shape({
  title: yup.string().required("${path} is required"),
  role_permissions: yup.array().nullable(),
  activated: yup.bool().nullable(),

});

EditRole.layout = AdminDashboardLayout;

export default  EditRole;