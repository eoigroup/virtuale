export const signIn = async (payload: { email: string; password: string }) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const signInWithGoogle = async () => {
  try {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const signUp = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const verifyEmail = async (payload: { email: string; otp: string }) => {
  try {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const sendResetPasswordCode = async (payload: { email: string }) => {
  try {
    const res = await fetch("/api/auth/password/send-reset-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const verifyResetPasswordCode = async (payload: {
  email: string;
  otp: string;
}) => {
  try {
    const res = await fetch("/api/auth/password/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createNewPassword = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch("/api/auth/password/create-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const changeEmail = async (payload: { email: string }) => {
  try {
    const res = await fetch("/api/auth/email/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const verifyNewEmail = async (payload: {
  email: string;
  otp: string;
}) => {
  try {
    const res = await fetch("/api/auth/email/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const checkAuthToken = async (payload: { token: string }) => {
  try {
    const res = await fetch("/api/auth/check-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const sendMagicLink = async (formData: FormData) => {
  try {
    const response = await fetch("https://smartminds.eoi.group/auth/send-magic-link/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send magic link');
    }

    return data;
  } catch (error: any) {
    console.error('Magic link error:', error);
    throw error;
  }
};
 