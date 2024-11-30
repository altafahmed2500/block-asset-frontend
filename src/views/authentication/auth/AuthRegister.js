import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import axios from "axios";

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        phone_number: "",
        profile_picture_url: "", // Default value to empty string
        date_of_birth: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            console.log("Sending data:", formData);

            const response = await axios.post(
                "http://127.0.0.1:8000/api/user/register",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json", // Ensure JSON format
                    },
                }
            );

            setSuccessMessage("User registered successfully!");
        } catch (error) {
            const errorResponse = error.response?.data || {};
            const errorDetails = Object.entries(errorResponse)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
            setErrorMessage(
                `Error registering user: ${errorDetails || "An unexpected error occurred."
                }`
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <Box component="form" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Column 1 */}
                    <Grid item xs={12} sm={6}>
                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="first_name"
                            >
                                First Name
                            </Typography>
                            <CustomTextField
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="last_name"
                            >
                                Last Name
                            </Typography>
                            <CustomTextField
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="email"
                            >
                                Email Address
                            </Typography>
                            <CustomTextField
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                    </Grid>

                    {/* Column 2 */}
                    <Grid item xs={12} sm={6}>
                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="username"
                            >
                                Username
                            </Typography>
                            <CustomTextField
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="password"
                            >
                                Password
                            </Typography>
                            <CustomTextField
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="phone_number"
                            >
                                Phone Number
                            </Typography>
                            <CustomTextField
                                id="phone_number"
                                name="phone_number"
                                type="tel"
                                value={formData.phone_number}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Profile Picture and Date of Birth */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="date_of_birth"
                            >
                                Date of Birth
                            </Typography>
                            <CustomTextField
                                id="date_of_birth"
                                name="date_of_birth"
                                type="date"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box mb={3}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="profile_picture_url"
                            >
                                Profile Picture URL
                            </Typography>
                            <CustomTextField
                                id="profile_picture_url"
                                name="profile_picture_url"
                                value={formData.profile_picture_url}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>

                {errorMessage && (
                    <Typography color="error" mt={2}>
                        {errorMessage}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="primary" mt={2}>
                        {successMessage}
                    </Typography>
                )}
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
