import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface DataProps {
	id: number;
	name: string;
	email: string;
	entries: number;
	joined: Date;
}

interface SignInProps {
	loadUser: (data: DataProps) => void;
	onRouteChange: (route: string) => void;
}

function Signin({ loadUser, onRouteChange }: SignInProps) {
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSignInEmail(event.target.value);
	}
	function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSignInPassword(event.target.value);
	}

	function onSubmitSignIn() {
		setIsLoading(true);
		fetch('https://face-recognition-brain-api-ro1l.onrender.com/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					//does the user exist? Did we receive a user with a property of id?
					loadUser(user);
					setIsLoading(false);
					onRouteChange('home');
				}
			});
	}

	return (
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset
						id='sign_up'
						className='ba b--transparent ph0 mh0'
					>
						<legend className='f1 fw6 ph0 mh0'>Sign In</legend>
						<div className='mt3'>
							<label
								className='db fw6 lh-copy f6'
								htmlFor='email-address'
							>
								Email
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='email'
								name='email-address'
								id='email-address'
								onChange={onEmailChange}
							/>
						</div>
						<div className='mv3'>
							<label
								className='db fw6 lh-copy f6'
								htmlFor='password'
							>
								Password
							</label>
							<input
								className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='password'
								name='password'
								id='password'
								onChange={onPasswordChange}
							/>
						</div>
					</fieldset>
					<div
						className='h2'
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<input
							onClick={onSubmitSignIn}
							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
							type='submit'
							value='Sign in'
							style={{
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						/>
						{isLoading && <LoadingSpinner />}
					</div>

					<div className='lh-copy mt4'>
						<p
							onClick={() => onRouteChange('register')}
							className='f6 link dim black db pointer'
						>
							Register
						</p>
					</div>
				</div>
			</main>
		</article>
	);
}

export default Signin;
