import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { MenuMain, Block, Smile } from 'ts/component';
import { I, Util } from 'ts/lib'; 
import { observer, inject } from 'mobx-react';

interface Props extends RouteComponentProps<any> {
	blockStore?: any;
};

@inject('blockStore')
@observer
class PageMainEdit extends React.Component<Props, {}> {
	
	state = {
	};

	constructor (props: any) {
		super(props);
	};
	
	render () {
		const { blockStore, match } = this.props;
		const { blocks } = blockStore;
		const block = blocks.find((item: I.Block) => { return item.header.id == match.params.id; });
		const contentDataview: I.ContentDataview = {
			view: '1',
			views: [
				{ id: '1', name: 'All', type: I.ViewType.Grid },
				{ id: '2', name: 'Team', type: I.ViewType.Grid },
				{ id: '3', name: 'Friends', type: I.ViewType.Grid }
			],
			properties: [
				{ id: '1', name: 'Id', type: I.PropertyType.Number },
				{ id: '2', name: 'Name', type: I.PropertyType.Title },
				{ id: '3', name: 'E-mail', type: I.PropertyType.Text },
			],
			data: [
				{ '1': '1', '2': 'Anton Pronkin', '3': 'pronkin@gmail.com' },
				{ '1': '2', '2': 'Roman Khafizianov', '3': 'khafizianov@gmail.com' },
				{ '1': '3', '2': 'Zhanna Sharipova', '3': 'sharipova@gmail.com' },
				{ '1': '4', '2': 'Anton Barulenkov', '3': 'barulenkov@gmail.com' },
				{ '1': '5', '2': 'Kirill', '3': 'kirill@gmail.com' },
			]
		};
		
		let list: I.Block[] = [
			{ 
				header: { id: '1', type: 2, name: '', icon: '' },
				content: contentDataview,
			},
			{ 
				header: { id: '2', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 0,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
			{ 
				header: { id: '3', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 1,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
			{ 
				header: { id: '4', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 2,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
			{ 
				header: { id: '5', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 3,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
			{ 
				header: { id: '6', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 4,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
			{ 
				header: { id: '7', type: 3, name: '', icon: '' },
				content: {
					text: 'test content',
					style: 5,
					marks: [],
					toggleable: false,
					markerType: 0,
					checkable: false,
					checked: false,
				},
			},
		];
		
		return (
			<div>
				<MenuMain />
				<div className="wrapper">
					<div className="editor">
						<div className="blocks">
							<div className="title">
								<Smile icon={block.header.icon} />
								{block.header.name}
							</div>
							{list.map((item: I.Block, i: number) => ( 
								<Block key={item.header.id} {...item} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};
	
	componentDidMount () {
	};
	
};

export default PageMainEdit;