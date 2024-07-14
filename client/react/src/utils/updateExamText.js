
export const updateExamDates = async (examDatesText) => {
    const response = await fetch('/updateExamDates/updateExamDates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ examDatesText })
    });

    if (!response.ok) {
        throw new Error('Failed to update exam dates');
    }

    return response.json();
};
