import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const ProfileCard = ({ user }) => {
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 88,
              height: 88,
              fontSize: 32,
              bgcolor: "primary.main",
            }}
          >
            {initials}
          </Avatar>

          <Box textAlign="center">
            <Typography variant="h5" fontWeight={700}>
              {fullName || "User"}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {user?.email || "-"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              First Name
            </Typography>

            <Typography fontWeight={600}>{user?.firstName || "-"}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Last Name
            </Typography>

            <Typography fontWeight={600}>{user?.lastName || "-"}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>

            <Typography fontWeight={600}>{user?.email || "-"}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
