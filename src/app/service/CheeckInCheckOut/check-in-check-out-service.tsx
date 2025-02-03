import { CheckInCheckOut } from "../../model/cheeck-In-check-out-model.tsx";

// ฟังก์ชันกรองข้อมูลตาม userId

// ฟังก์ชันเพิ่มข้อมูลใหม่
export const createCheckInCheckOut = async (
  newData: CheckInCheckOut,
  basePath: string
): Promise<CheckInCheckOut> => {
  try {
    const response = await fetch(`${basePath}/check-in-check-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error("ไม่สามารถเพิ่มข้อมูลได้");
    }
    const data: CheckInCheckOut = await response.json();
    return data;
  } catch (error) {
    throw new Error("ไม่สามารถเพิ่มข้อมูลได้: " + error.message);
  }
};

// ฟังก์ชันอัปเดตข้อมูล
export const updateCheckInCheckOut = async (
  updatedData: CheckInCheckOut,
  basePath: string
): Promise<CheckInCheckOut> => {
  try {
    const response = await fetch(
      `${basePath}/check-in-check-out/${updatedData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("ไม่สามารถอัปเดตข้อมูลได้");
    }
    const data: CheckInCheckOut = await response.json();
    return data;
  } catch (error) {
    throw new Error("ไม่สามารถอัปเดตข้อมูลได้: " + error.message);
  }
};

// ฟังก์ชันลบข้อมูล
export const deleteCheckInCheckOut = async (
  id: number,
  basePath: string
): Promise<void> => {
  try {
    const response = await fetch(`${basePath}/check-in-check-out/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    }
  } catch (error) {
    throw new Error("ไม่สามารถลบข้อมูลได้: " + error.message);
  }
};
