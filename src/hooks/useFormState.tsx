import { ChangeEvent, useEffect, useState } from "react";

export default function useFormState(data: any) {
  const [state, setState] = useState<any>();

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<any>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e: ChangeEvent<any>) => {
    const { name, value, checked } = e.target;
    const values = new Set(state[name]);
    const intValue = parseInt(value, 10);

    values.delete(intValue);

    if (checked) {
      values.add(intValue);
    }

    setState({
      ...state,
      [name]: [...values],
    });
  };

  return {
    state,
    handleChange,
    handleChecked,
  };
}
