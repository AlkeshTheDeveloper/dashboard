import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import ProfileCard from "../../features/profile/components/ProfileCard";
import ProfileForm from "../../features/profile/components/ProfileForm";

import { updateProfile } from "../../features/profile/profileSlice";

import { showSnackbar } from "../../features/ui/uiSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.profile);

  const handleSubmit = async (data) => {
    try {
      const updatedUser = await dispatch(updateProfile(data)).unwrap();

      /*
       * IMPORTANT:
       * Your authSlice needs to update user
       * with the returned user.
       */

      dispatch({
        type: "auth/updateUser",
        payload: updatedUser,
      });

      dispatch(
        showSnackbar({
          message: "Profile updated successfully",
          severity: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error || "Failed to update profile",
          severity: "error",
        }),
      );
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Profile
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage your account information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <ProfileCard user={user} />
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Personal Information
              </Typography>

              <ProfileForm
                user={user}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
