import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    LoadingOverlay,
    Box,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import Repository from '../../extension/HttpHelper';
import { isNullOrEmpty, isNullOrUndefined, isNullOrUndefinedArry } from '../../hepler/StringHelper';
import { Login, MessageResponse, WareHouseDTOs } from '../../model/model';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';



export function AuthenticationTitle() {

    const form = useForm<Login>({
        initialValues: {
            username: 'admin@gmail.com',
            password: '123456'
        },

        validate: {
            username: hasLength({ min: 2, max: 100 }, 'Tài khoản phải chưa từ 2-10 kí tự !'),
            password: hasLength({ min: 2, max: 100 }, 'Mật khẩu phải chưa từ 2-10 kí tự !'),
        },
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [visible1,setvisible1] = useState(false);
    const repository = new Repository("http://localhost:50001/api/v1");

    const login = async (e: FormEvent) => {
        e.preventDefault();
        setvisible1(true)
        const data = form.values;
        let urlCreate = `/AuthorizeMaster/login`;
        let callapi = await repository.post<MessageResponse<any>>(urlCreate, data);
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data)) {
            console.log(callapi)
            setvisible1(false)
        }
    };
    return (
        <Box component="form" maw={400} mx="auto" onSubmit={login}>

            <LoadingOverlay visible={visible1} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" >
                <TextInput
                    label="Email: "
                    placeholder="Email..."
                    mt="md"
                    {...form.getInputProps('username')}
                />
                <PasswordInput label="Password" placeholder="Your password" required mt="md"    {...form.getInputProps('password')} />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button type='submit' fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Box>
    );
}