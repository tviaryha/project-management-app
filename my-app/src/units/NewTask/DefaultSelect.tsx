import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormHelperText,
  useTheme,
  Theme,
  SelectChangeEvent
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateTaskParamResp } from '../../api/models/task';
import { FormTranslationKeys } from '../../enums';
import useAppSelector from '../../hooks/useAppSelector';
import { TranslationKeys } from './enum';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const getStyles = (selectedLogin: string, logins: readonly string[], theme: Theme) => ({
  fontWeight:
    logins.indexOf(selectedLogin) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium
});

type Props = ReturnType<UseFormRegister<ICreateTaskParamResp>>;

const DefaultSelect = React.forwardRef<typeof FormControl, Props>(({ name, onChange }, ref) => {
  const [logins, setLogins] = useState<string[]>([]);

  const { t } = useTranslation([TranslationKeys.ns, FormTranslationKeys.ns]);
  const theme = useTheme();
  const allUsers = useAppSelector((state) => state.newTask.allUsers);
  const boardUsers = useAppSelector((state) => state.newTask.boardUsers);
  const filteredUsers = allUsers.filter((user) => boardUsers.includes(user._id));

  const handleChange = (e: SelectChangeEvent<typeof logins>) => {
    const {
      target: { value }
    } = e;
    setLogins(typeof value === 'string' ? value.split(',') : value);
    onChange(e);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="usersLabel">{t(TranslationKeys.users)}</InputLabel>

      <Select
        name={name}
        ref={ref}
        labelId="usersLabel"
        id="users"
        value={logins}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label={t(TranslationKeys.users)} />}
        MenuProps={MenuProps}>
        {filteredUsers.map((user) => (
          <MenuItem key={user._id} value={user._id} style={getStyles(user.login, logins, theme)}>
            {user.login}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ textAlign: 'justify' }}>
        {t(TranslationKeys.usersHelper)}
      </FormHelperText>
    </FormControl>
  );
});

DefaultSelect.displayName = 'DefaultSelect';

export default DefaultSelect;
