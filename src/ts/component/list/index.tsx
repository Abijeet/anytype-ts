import * as React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Icon, IconObject } from 'ts/component';
import { blockStore, dbStore } from 'ts/store';
import { observer } from 'mobx-react';
import { I, DataUtil } from 'ts/lib';

interface Props {
	getList?(): void;
	onSelect?(e: any, item: any): void;
	onAdd?(e: any): void;
	onMore?(e: any, item: any): void;
	onSortEnd?(result: any): void;
	helperContainer?(): any;
};

@observer
class ListIndex extends React.Component<Props, {}> {
	
	constructor (props: any) {
		super(props);
		
		this.onSortEnd = this.onSortEnd.bind(this);
	};
	
	render () {
		const { onSelect, onAdd, onMore, helperContainer, getList } = this.props;
		const { root } = blockStore;
		const element = blockStore.getLeaf(root, root);
		
		if (!element) {
			return null;
		};
		
		const childrenIds = blockStore.getChildrenIds(root, root);
		const length = childrenIds.length;
		const children = getList();
		const map = blockStore.getDetailsMap(root);
		const size = map.size;
		
		const Item = SortableElement((item: any) => {
			const content = item.content || {};
			const object = blockStore.getDetails(root, content.targetBlockId);
			const { _detailsEmpty_, name, iconEmoji, iconImage } = object;
			const type = DataUtil.schemaField(object.type);
			const objectType: any = type ? dbStore.getObjectType(object.type) : null;
			const cn = [ 'item' ];

			let layout = I.ObjectLayout.Page;
			if (undefined !== object.layout) {
				layout = object.layout;
			} else 
			if (objectType && (undefined !== objectType.layout)) {
				layout = objectType.layout;
			};

			if (_detailsEmpty_) {
				return (
					<div className="item">
						<div className="iconObject c48" />
						<div className="line animatedBackground" />
					</div>
				);
			};

			let icon = <IconObject size={48} object={object} />;
			let showMenu = true;

			if (content.style == I.LinkStyle.Dataview) {
				showMenu = false;
			} else 
			if (content.style == I.LinkStyle.Archive) {
				icon = (
					<div className="iconObject c48">
						<div className="iconEmoji c48">
							<Icon className="archive" />
						</div>
					</div>
				);
				showMenu = false;
			};

			if (layout == I.ObjectLayout.Task) {
				cn.push('isTask');
				icon = <IconObject size={20} object={object} canEdit={true} onCheckbox={(e: any) => { this.onCheckbox(e, object); }} />;
			};

			return (
				<div id={'item-' + item.id} className={cn.join(' ')}>
					{icon}
					<div className="name">{name}</div>
					{showMenu ? <Icon id={'button-' + item.id + '-more'} tooltip="Actions" className="more" onClick={(e: any) => { onMore(e, item); }} /> : ''}
					<div className="type">{objectType ? objectType.name : ''}</div>
					<div className="click" onClick={(e: any) => { onSelect(e, item); }} onContextMenu={(e: any) => { 
						if (showMenu) {
							onMore(e, item); 
						};
					}} />
				</div>
			);
		});
		
		const ItemAdd = SortableElement((item: any) => {
			return (
				<div id="button-add" className="item add" onClick={onAdd}>
					<Icon />
				</div>
			);
		});
		
		const List = SortableContainer((item: any) => {
			return (
				<React.Fragment>
					{item.list.map((item: any, i: number) => (
						<Item key={item.id} {...item} index={i} />
					))}
					<ItemAdd index={length + 1} disabled={true} />
				</React.Fragment>
			);
		});
		
		return (
			<List 
				axis="xy" 
				transitionDuration={150}
				distance={10}
				list={children} 
				helperClass="isDragging"
				getContainer={helperContainer}
				helperContainer={helperContainer} 
				onSortEnd={this.onSortEnd} 
			/>
		);
	};

	onCheckbox (e: any, item: any) {
		e.preventDefault();
		e.stopPropagation();

		DataUtil.pageSetDone(item.id, !item.done);
	};
	
	onSortEnd (result: any) {
		const { onSortEnd } = this.props;
		onSortEnd(result);
	};
	
};

export default ListIndex;