import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

// Base URL of the backend users API
const API = "http://localhost:4000/api/users";
// Max allowed size for the profile photo
const MAX_PHOTO_MB = 2;

/* ---------- small helper components ---------- */

// Default profile icon, used when the user has no photo
const DefaultAvatar = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full text-[#8A94A8]" fill="currentColor">
    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.2 0-7.5 2.2-7.5 5v1h15v-1c0-2.8-3.3-5-7.5-5Z" />
  </svg>
);

// Pencil icon for the edit photo overlay
const PencilIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

// Eye icon: open eye = password is visible, crossed eye = hidden
const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 6.6C3.7 8.4 2 12 2 12s3.5 6 10 6c1.5 0 2.8-.3 4-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );

// Lock icon shown on fields the user cannot edit
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

// Small tick used in the profile completeness list
const CheckIcon = ({ done }) => (
  <span
    className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
      done ? "bg-[#E2B33C] text-[#0B1F44]" : "border border-[#C5CCDA] text-transparent"
    }`}
  >
    ✓
  </span>
);

// Shared style for all text inputs
const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0B1730] placeholder-[#A3ACBD] outline-none transition focus:border-[#0B1F44] focus:ring-4 focus:ring-[#0B1F44]/10";

// Label + input + error/hint text
const Field = ({ label, error, hint, children }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-[#33405A]">{label}</label>
    {children}
    {error ? (
      <p className="mt-1.5 text-xs text-red-600">{error}</p>
    ) : hint ? (
      <p className="mt-1.5 text-xs text-[#7B869B]">{hint}</p>
    ) : null}
  </div>
);

// A titled block of the form
const Section = ({ title, subtitle, children }) => (
  <section className="border-t border-[#E6EAF2] pt-6 first:border-t-0 first:pt-0">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-[#0B1730]">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-[#7B869B]">{subtitle}</p>}
    </div>
    {children}
  </section>
);

// Read-only input (greyed out, cannot be edited)
const LockedInput = ({ value, placeholder }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly
      disabled
      className={`${inputBase} cursor-not-allowed border-[#E6EAF2] bg-[#F4F6FA] pr-10 text-[#6B768C]`}
    />
    <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#A3ACBD]">
      <LockIcon />
    </span>
  </div>
);

// Password input with a show/hide eye button
const PasswordInput = ({ name, value, onChange, show, onToggle, error, placeholder, autoComplete }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`${inputBase} pr-12 ${error ? "border-red-400" : "border-[#D9DFEA]"}`}
    />
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#7B869B] hover:text-[#0B1F44]"
    >
      <EyeIcon open={show} />
    </button>
  </div>
);

/* ---------- main component ---------- */

function UserProfile() {
  const { auth } = useAuth();

  // Starting values for the form and the password fields
  const emptyForm = { firstName: "", lastName: "", phone: "", address: "" };
  const emptyPw = { newPassword: "", confirmPassword: "" };

  // formData = what the user is editing, savedData = what is saved in the database
  const [formData, setFormData] = useState(emptyForm);
  const [savedData, setSavedData] = useState(emptyForm);
  // Fields the user cannot edit here (email, year, photo)
  const [readOnly, setReadOnly] = useState({ universityEmail: "", year: "", photo: "" });
  // Password fields and whether each one is visible
  const [passwords, setPasswords] = useState(emptyPw);
  const [showPw, setShowPw] = useState({ newPassword: false, confirmPassword: false });
  // Validation errors and loading states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  // Reference to the hidden file input (used to open the file picker)
  const fileInputRef = useRef(null);

  // Id of the logged-in user
  const userId = auth?.user?.id || auth?.user?._id;

  /* Load the current user data from the backend */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${API}/profile/${userId}`);
        const loaded = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          address: data.address || "",
        };
        setFormData(loaded);
        setSavedData(loaded);
        setReadOnly({
          // falls back to the logged-in user object if the profile API doesn't return the email
          universityEmail:
            data.universityEmail || data.email || auth?.user?.universityEmail || auth?.user?.email || "",
          year: data.year || data.academicYear || "",
          photo: data.profilePhoto || data.profileImage || data.avatar || "",
        });
        setImgFailed(false);
      } catch (error) {
        console.error("Loading error:", error);
        toast.error("Could not load your profile. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    if (auth) fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  /* ---------- handlers ---------- */

  // Update a text field and clear its error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Phone field: allow only digits, + and spaces
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+\s]/g, "");
    setFormData((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  // Update a password field and clear its error
  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* Upload a new profile photo */
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the user pick the same file again
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_PHOTO_MB} MB.`);
      return;
    }
    if (!userId) {
      toast.error("Please log in first.");
      return;
    }

    // Show the new photo right away, and keep the old one in case the upload fails
    const previousPhoto = readOnly.photo;
    const previewUrl = URL.createObjectURL(file);
    setReadOnly((prev) => ({ ...prev, photo: previewUrl }));
    setImgFailed(false);
    setUploading(true);

    try {
      // Send the file to the backend as multipart form data
      const fd = new FormData();
      fd.append("photo", file);
      fd.append("userId", userId);

      const res = await axios.post(`${API}/upload-photo`, fd, { withCredentials: true });
      const serverUrl = res.data?.photo || res.data?.profilePhoto || res.data?.url;
      if (serverUrl) setReadOnly((prev) => ({ ...prev, photo: serverUrl }));
      toast.success("Profile photo updated");
    } catch (error) {
      console.error("Photo upload error:", error);
      // Upload failed, so go back to the old photo
      setReadOnly((prev) => ({ ...prev, photo: previousPhoto }));
      toast.error(error?.response?.data?.message || "Could not upload your photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Check all fields and return an object with error messages
  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    if (!formData.address.trim()) e.address = "Address is required";

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) e.phone = "Phone number is required";
    else if (phoneDigits.length < 9 || phoneDigits.length > 12) e.phone = "Enter a valid phone number";

    if (passwords.newPassword || passwords.confirmPassword) {
      if (passwords.newPassword.length < 8) e.newPassword = "Use at least 8 characters";
      if (passwords.confirmPassword !== passwords.newPassword) e.confirmPassword = "Passwords do not match";
    }
    return e;
  };

  // Save button: validate, then send the data to the backend
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    if (!userId) {
      toast.error("Please log in first.");
      return;
    }

    // Data sent to the backend 
    const payload = {
      userId,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    };
    if (passwords.newPassword) payload.password = passwords.newPassword;

    setSaving(true);
    try {
      const res = await axios.put(`${API}/update-profile`, payload, { withCredentials: true });
      if (res.status === 200) {
        setSavedData({ ...formData });
        setPasswords(emptyPw);
        setShowPw({ newPassword: false, confirmPassword: false });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Could not update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Discard button
  const handleDiscard = () => {
    setFormData(savedData);
    setPasswords(emptyPw);
    setShowPw({ newPassword: false, confirmPassword: false });
    setErrors({});
  };

  /* values calculated from the state */
  const fullName = `${savedData.firstName} ${savedData.lastName}`.trim() || "Your name";
  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(savedData) || passwords.newPassword || passwords.confirmPassword;

  // Profile completeness: how many of these items are filled
  const checklist = [
    { label: "Name", done: !!(savedData.firstName && savedData.lastName) },
    { label: "Profile photo", done: !!readOnly.photo },
    { label: "Phone number", done: !!savedData.phone },
    { label: "Address", done: !!savedData.address },
  ];
  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);

  // Input style: red border when the field has an error
  const cls = (name) => `${inputBase} ${errors[name] ? "border-red-400" : "border-[#D9DFEA]"}`;

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navbar />

      {/* Toast messages: top center */}
      <Toaster
        position="top-center"
        containerStyle={{ top: 90 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0B1F44",
            color: "#fff",
            borderRadius: "14px",
            fontSize: "14px",
            padding: "14px 20px",
            boxShadow: "0 20px 50px rgba(11,31,68,0.35)",
          },
          success: { iconTheme: { primary: "#E2B33C", secondary: "#0B1F44" } },
          error: {
            style: { background: "#DC2626", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#DC2626" },
          },
        }}
      />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#0B1730]">Account settings</h1>
          <p className="mt-1 text-sm text-[#7B869B]">Manage your personal details and password.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[310px_1fr]">
          {/* Left side: photo */}
          <aside className="overflow-hidden rounded-2xl border border-[#E6EAF2] bg-white shadow-sm lg:sticky lg:top-24">
            <div className="h-24 bg-[#0B1F44]" />
            <div className="px-6 pb-6 text-center">
              {/* Profile photo: click the photo (or the hover overlay) to change it */}
              <div className="group relative -mt-[4.5rem] mx-auto h-36 w-36">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  aria-label="Change profile photo"
                  className="relative block h-full w-full overflow-hidden rounded-full border-4 border-white bg-[#E9EDF5] shadow-lg ring-2 ring-[#E2B33C] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0B1F44]/40"
                >
                  {/* Show the profile photo */}
                  {readOnly.photo && !imgFailed ? (
                    <img
                      src={readOnly.photo}
                      alt={fullName}
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <DefaultAvatar />
                  )}

                  {/* Hover overlay with the edit icon */}
                  <span
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#0B1F44]/60 text-white transition-opacity duration-200 ${
                      uploading ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    }`}
                  >
                    {uploading ? (
                      <span className="h-7 w-7 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <PencilIcon />
                        <span className="text-xs font-medium">Change photo</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Hidden file input, opened by the button above */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-[#0B1730]">{loading ? "Loading…" : fullName}</h2>
              <p className="mt-1 break-all text-sm text-[#7B869B]">
                {readOnly.universityEmail || (loading ? "" : "No university email found")}
              </p>
              {readOnly.year && (
                <span className="mt-3 inline-block rounded-full bg-[#FBF3DB] px-3 py-1 text-xs font-semibold text-[#7A5A06]">
                  {readOnly.year}
                </span>
              )}

              {/* Profile completeness bar and checklist */}
              <div className="mt-6 border-t border-[#E6EAF2] pt-5 text-left">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#33405A]">Profile completeness</span>
                  <span className="font-semibold text-[#0B1F44]">{percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E9EDF5]">
                  <div
                    className="h-full rounded-full bg-[#E2B33C] transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <ul className="mt-4 space-y-2">
                  {checklist.map((item) => (
                    <li key={item.label} className="flex items-center gap-2.5 text-sm text-[#52607A]">
                      <CheckIcon done={item.done} />
                      <span className={item.done ? "" : "text-[#7B869B]"}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* edit form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-2xl border border-[#E6EAF2] bg-white p-6 shadow-sm sm:p-7"
          >
            <Section title="Personal details" subtitle="This is how your name appears across Club Link.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="First name" error={errors.firstName}>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={cls("firstName")} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={cls("lastName")} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Address" error={errors.address}>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={cls("address")} />
                  </Field>
                </div>
              </div>
            </Section>

            <Section title="Contact & academic" subtitle="Your phone is shared with club organisers. University details can’t be changed.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Phone number" error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="07X XXX XXXX"
                    className={cls("phone")}
                  />
                </Field>
                <Field label="Academic year">
                  <LockedInput value={readOnly.year} placeholder="Not set" />
                </Field>
                <div className="md:col-span-2">
                  <Field label="University email">
                    <LockedInput value={readOnly.universityEmail} placeholder="Not set" />
                  </Field>
                </div>
              </div>
            </Section>

            <Section title="Password" subtitle="Leave both fields empty to keep your current password.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="New password" error={errors.newPassword} hint="At least 8 characters.">
                  <PasswordInput
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePwChange}
                    show={showPw.newPassword}
                    onToggle={() => setShowPw((p) => ({ ...p, newPassword: !p.newPassword }))}
                    error={errors.newPassword}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />
                </Field>
                <Field label="Confirm new password" error={errors.confirmPassword}>
                  <PasswordInput
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePwChange}
                    show={showPw.confirmPassword}
                    onToggle={() => setShowPw((p) => ({ ...p, confirmPassword: !p.confirmPassword }))}
                    error={errors.confirmPassword}
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                  />
                </Field>
              </div>
            </Section>

            {/* Discard and save buttons */}
            <div className="flex flex-col-reverse items-stretch gap-3 border-t border-[#E6EAF2] pt-5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={!hasChanges || saving}
                className="rounded-full px-5 py-3 text-sm font-semibold text-[#52607A] transition hover:bg-[#F4F6FA] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Discard changes
              </button>
              <button
                type="submit"
                disabled={saving || loading}
                className="rounded-full bg-[#0B1F44] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#13306A] focus:outline-none focus:ring-4 focus:ring-[#0B1F44]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;